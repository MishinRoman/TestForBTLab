import React, { FormEvent, useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { ITimeSheet } from "../services/Interfaces";
import { reasons } from "../services/reasons.list";

type Props = {
  onSubminHandler: (event: FormEvent<HTMLFormElement>) => void;
  data: ITimeSheet;
  setData: (data: ITimeSheet) => void;
};

const FormNewData = (props: Props) => {
  return (
    <Form onSubmit={props.onSubminHandler} className="py-4 my-4">
      {/* Причина отсутсвия*/}
      <FormGroup className="my-4">
        <Label for="Select">Причина отсутсвия</Label>
        <Input
          id="Select"
          name="select"
          type="select"
          required
          onChange={(e) =>
            props.setData({ ...props.data, reason: Number(e.target.value) })
          }
          value={props.data.reason}
          defaultValue={-1}
        >
          <option disabled  selected value={-1}>
            {"Выбирите занчения..."}
          </option>
          {Object.entries(reasons).map((key, value) => (
            <option value={value}>{key[0]}</option>
          ))}
        </Input>
      </FormGroup>
      {/* Дата начала*/}
      <FormGroup className="my-4">
        <Label for="Date">Дата начала</Label>
        <Input
          onChange={(e) => {
            props.setData({ ...props.data, startDate: e.target.value});
          }}
          value={ props.data.startDate}
          type="date"
          required
        />
      </FormGroup>
      {/* Комментарии*/}
      <FormGroup className="my-4">
        <Label for="Text">Комментарии</Label>
        <Input
          id="Text"
          name="text"
          type="textarea"
          required
          onChange={(e) =>
            props.setData({ ...props.data, description: e.target.value })
          }
          value={props.data.description}
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
          value={props.data.duration}
          onChange={(e)=>{props.setData({...props.data, duration:+e.target.value})}}
          min={0}
          required
        />
      </FormGroup>

      {/* Учтено при оплате*/}
      <FormGroup check className="my-4">
        <Input
          type="checkbox"
          onChange={(e) =>
            props.setData({ ...props.data, discounted: e.target.checked })
          }
          checked={props.data.discounted}
        />{" "}
        <Label check>Учтено при оплате</Label>
      </FormGroup>

      <Button type="submit">Сохранить</Button>
    </Form>
  );
};

export default FormNewData;
