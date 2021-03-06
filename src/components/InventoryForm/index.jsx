import React, { useState } from "react";
import { Form, Input, Select, Button, Modal } from "antd";
import db from "../../firebaseConfig";
import * as firebase from "firebase";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const InventoryForm = () => {
  const { t } = useTranslation();

  const [code, setCode] = useState({
    category: "Items",
    name: "",
    generatedCode: "",
  });
  const [inventoryFormState, setInventoryFormState] = useState({
    category: "Items",
    itemCode: "",
    itemName: "",
    measurementUnit: "Pcs",
    price: 0,
    stock: 0,
    stockLimit: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  const handleOk = (e) => {
    setModalVisible(false);
  };

  const handleCancel = (e) => {
    setModalVisible(false);
  };

  const addItem = () => {
    db.collection("inventory").doc(inventoryFormState.itemCode).set({
      category: inventoryFormState.category,
      itemCode: inventoryFormState.itemCode,
      itemName: inventoryFormState.itemName,
      measurementUnit: inventoryFormState.measurementUnit,
      price: inventoryFormState.price,
      stock: inventoryFormState.stock,
      stockLimit: inventoryFormState.stockLimit,
      createdAt: timestamp(),
    });

    handleOk();
    setInventoryFormState({
      category: "Items",
      itemCode: "",
      itemName: "",
      measurementUnit: "Pcs",
      price: 0,
      stock: 0,
      stockLimit: 0,
    });
    setCode({
      category: "Items",
    name: "",
    generatedCode: "",}
    );
  };
  console.log(inventoryFormState);
  const handleChangeName = (e, key) => {
    const threeLetterName = e.target.value.slice(0, 3).toUpperCase();
    setCode({
      ...code,
      name: threeLetterName,
    });
    setInventoryFormState({
      ...inventoryFormState,
      [key]: e.target.value,
    });
  };

  const handleChangeCategory = (e, key) => {
    const firstLetterCategory = e.slice(0, 3).toUpperCase();
    setCode({
      ...code,
      category: firstLetterCategory,
    });

    setInventoryFormState({
      ...inventoryFormState,
      [key]: e,
    });
  };

  const handleChange = (e, key) => {
    const iForInventory = "I";

    setCode({
      ...code,
      generatedCode: iForInventory + code.category + code.name,
    });

    setInventoryFormState({
      ...inventoryFormState,
      itemCode: code.generatedCode,
      [key]: e.target ? e.target.value : e,
    });
  };

  return (
    <div>
      <Button onClick={showModal} className="button" type="primary">
        {t("inventory.addBtn")}
      </Button>
      <Modal
        destroyOnClose={true}
        title={t("inventory.addBtnModal.modalTitle")}
        visible={modalVisible}
        //onOk={addItem}
        onCancel={handleCancel}
        footer={[
          <Button danger key="cancel" onClick={handleCancel}>
            {t("inventory.addBtnModal.cancel")}
          </Button>,
          <Button
            type="primary"
            form="inventoryForm"
            key="submit"
            htmlType="submit"
          >
            {t("inventory.addBtnModal.ok")}
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          name="inventoryForm"
          onFinish={addItem}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label={t("inventory.addBtnModal.itemName")}
            name="itemName"
            rules={[
              {
                required: true,
                message: t("inventory.addBtnModal.pleaseItemName"),
              },
            ]}
          >
            <Input
              type="text"
              id="itemName"
              name="itemName"
              value={inventoryFormState.itemName}
              onChange={(e) => handleChangeName(e, "itemName")}
            />
          </Form.Item>

          <Form.Item
            label={t("inventory.addBtnModal.category")}
            name="category"
            rules={[
              {
                required: false,
                message: t("inventory.addBtnModal.pleaseSelectCategory"),
              },
            ]}
          >
            <Select
              defaultValue="items"
              value={inventoryFormState.category}
              style={{ width: 120 }}
              onChange={(e) => handleChangeCategory(e, "category")}
            >
              <Option value="items">
                {t("inventory.addBtnModal.categoryMenu.items")}
              </Option>
              {/* <Option value="ye??illik">
                {t("inventory.addBtnModal.categoryMenu.green")}
              </Option>
              <Option value="hayvansal">
                {t("inventory.addBtnModal.categoryMenu.animal")}
              </Option>
              <Option value="ya??/sos">
                {t("inventory.addBtnModal.categoryMenu.oilSauce")}
              </Option>
              <Option value="baharat">
                {t("inventory.addBtnModal.categoryMenu.spice")}
              </Option>
              <Option value="konserve">
                {t("inventory.addBtnModal.categoryMenu.canned")}
              </Option>
              <Option value="kuru g??da">
                {t("inventory.addBtnModal.categoryMenu.dryFood")}
              </Option>
              <Option value="meyve">
                {t("inventory.addBtnModal.categoryMenu.fruit")}
              </Option> */}
            </Select>
          </Form.Item>

          <Form.Item label={t("inventory.addBtnModal.price")} name="price">
            <Input
              min={0}
              type="number"
              id="price"
              name="price"
              value={inventoryFormState.price}
              onChange={(e) => handleChange(e, "price")}
            />
          </Form.Item>

          <Form.Item
            label={t("inventory.addBtnModal.stock")}
            name="stock"
            rules={[
              {
                required: true,
                message: t("inventory.addBtnModal.pleaseStockAmount"),
              },
            ]}
          >
            <Input
              min={0}
              type="number"
              id="stock"
              name="stock"
              value={inventoryFormState.stock}
              onChange={(e) => handleChange(e, "stock")}
            />
          </Form.Item>
          <Form.Item
            label={t("inventory.addBtnModal.stockWarning")}
            name="stockLimit"
            rules={[
              {
                required: true,
                message: t("inventory.addBtnModal.pleaseStockLimit"),
              },
            ]}
          >
            <Input
              min={0}
              type="number"
              id="stockLimit"
              name="stockLimit"
              value={inventoryFormState.stockLimit}
              onChange={(e) => handleChange(e, "stockLimit")}
            />
          </Form.Item>

          <Form.Item
            label={t("inventory.addBtnModal.unit")}
            name="measurementUnit"
            rules={[
              {
                required: false,
                message: t("inventory.addBtnModal.pleaseSelectUnit"),
              },
            ]}
          >
            <Select
              defaultValue="pcs"
              value={inventoryFormState.measurementUnit}
              style={{ width: 120 }}
              onChange={(e) => handleChange(e, "measurementUnit")}
            >
              <Option value="pcs">PCS</Option>
              <Option value="ml"></Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryForm;
