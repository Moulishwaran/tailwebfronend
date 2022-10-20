import { message, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AddEditTransaction from "../components/AddEditTransaction";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import "../resources/transactions.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("student-user"));
      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        { userid: user._id }
      );
      console.log(response.data);
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something Went Wrong");
    }
  };

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Deleted Successfully");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentname",
    },
    {
      title: "Subject Name",
      dataIndex: "subjectname",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Mark",
      dataIndex: "mark",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined
              className="mx-3"
              onClick={() => deleteTransaction(record)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-content-center">
        <div></div>
        <div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analtics">
        <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div>
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
