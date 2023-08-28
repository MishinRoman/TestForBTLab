import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Form,
} from "reactstrap";
import { ITimeSheet } from "../services/Interfaces";
import timesheetSevice from "../services/timesheet.sevice";
import { reasons } from "../services/reasons.list";

type Props = {
  dataForChanged: ITimeSheet;
  getAll: () => any;
};

function ModalForChange(props: Props) {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<ITimeSheet>(props.dataForChanged);

  const onSubminHandler = async () => {
    await timesheetSevice
      .update(data)
      .then(async () => await props.getAll())
      .catch((err) => alert(err["message"]));

    toggle();
  };
  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Button color="success" onClick={toggle}>
        Изменить
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Изменить запись с ИД: {data.id}</ModalHeader>
        <ModalBody>
          <Form className="py-4 my-4">
            <FormGroup className="my-4">
              <Label for="Select">Причина отсутсвия</Label>
              <Input
                id="Select"
                name="select"
                type="select"
                required
                onChange={(e) =>
                  setData({ ...data, reason: Number(e.target.value) })
                }
                defaultValue={""}
                value={data.reason}
              >
                <option disabled defaultChecked selected value={""}>
                  {"Выбирите занчения..."}
                </option>
                {Object.entries(reasons).map((key, value) => (
                  <option value={value}>{key[0]}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className="my-4">
              <Label for="Date">Дата начала</Label>
              <Input
                onChange={(e) => {
                  setData({ ...data, startDate: e.target.value });
                  console.log(e.target.value);
                }}
                value={data.startDate}
                id="Date"
                type="date"
                required
              />
            </FormGroup>
            {/*Количество дней */}
            <FormGroup>
              <Label for="Number">Продолжительность рабочих дней</Label>
              <Input
                id="Number"
                name="number"
                placeholder="Укажите количество дней ..."
                type="number"
                value={data.duration}
                onChange={(e) => {
                  setData({ ...data, duration: +e.target.value });
                }}
                min={0}
                required
              />
            </FormGroup>
            <FormGroup className="my-4">
              <Label for="Text">Комментарии</Label>
              <Input
                id="Text"
                name="text"
                type="textarea"
                required
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup check className="my-4">
              <Input
                type="checkbox"
                onChange={(e) =>
                  setData({ ...data, discounted: e.target.checked})
                }
                checked={data.discounted}
              />{" "}
              <Label check>Учтено при оплате</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={onSubminHandler}>
            Сохранить
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Отмена
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalForChange;
