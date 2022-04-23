import React, { useEffect } from "react";
import { Form, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentUser,
} from '../actions/user';

const initFormValues = {
	name: "",
	email: "",
};

export const MyAccount = () => {
	const dispatch = useDispatch();

	const { currentUser } = useSelector((state) => state.auth);
	const [userForm] = Form.useForm();

	console.log(currentUser)

	useEffect(() => {
		userForm.setFieldsValue({
			name: currentUser.name,
			email: currentUser.email,
		});

		return () => {
			userForm.resetFields();
		};
	}, [currentUser, userForm]);

	const onFinishAddInfo = (values) => {
		delete values.confirmPassword;
		dispatch(updateCurrentUser({ id: currentUser.uid, rol: currentUser.rol, ...values }));
	}

	return (
		<>
			<Form
				form={userForm}
				name="addUserForm"
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 18,
				}}
				onFinish={onFinishAddInfo}
				initialValues={initFormValues}
			>
				<Form.Item
					label="Nombre"
					name="name"
					rules={[
						{
							required: true,
							message: "El nombre es obligatorio",
						},
					]}
				>
					<Input placeholder="Ingrese el nombre" />
				</Form.Item>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "El email es obligatorio",
						},
						{
							type: "email",
							message: "Email invalido",
						},
					]}
				>
					<Input placeholder="Ingrese el email" />
				</Form.Item>
				<Form.Item
					label="Contraseña"
					name="password"
					rules={[
						{
							required: true,
							message: "Ingrese la contraseña",
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="Confirmar contraseña"
					name="confirmPassword"
					hasFeedback
					rules={[
						{
							required: true,
							message: "Confirme la contraseña",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Las contraseñas no coinciden'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					wrapperCol={{
						offset: 4,
						span: 24,
					}}
				>
					<Button type="primary" htmlType="submit">
						Guardar
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
