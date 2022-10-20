import { Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Spinner from "./Spinner";

function AddEditTransaction({
  showAddEditTransactionModal,
  setShowAddEditTransactionModal,
  selectedItemForEdit,
  setSelectedItemForEdit,
  getTransactions,
}) {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("student-user"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Updated Successfully!!!");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success("Added Successfully!!!");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      message.error("Something Went Wrong");
      setLoading(false);
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Edit Student Detail" : "Add Student Detail"}
      visible={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label="Student Name" name="studentname">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Subject Name" name="subjectname">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="monthly exam">Monthly Exam</Select.Option>
            <Select.Option value="quartley exam">Quartely Exam</Select.Option>
            <Select.Option value="Half yearly exam">
              Half Yearly Exam
            </Select.Option>
            <Select.Option value="annual exam">Annual Exam</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mark" name="mark">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;
