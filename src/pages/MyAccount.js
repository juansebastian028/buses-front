import React, { useEffect } from "react";
import { Form, Button, Input } from "antd";
import { useSelector } from "react-redux";

const initFormValues = {
	name: "",
	email: "",
	phone: "",
};

export const MyAccount = () => {
	const { currentUser } = useSelector((state) => state.auth);
	const [userForm] = Form.useForm();

	useEffect(() => {
		userForm.setFieldsValue({
			name: currentUser.name,
			email: currentUser.email,
			phone: "3115548520",
		});

		return () => {
			userForm.resetFields();
		};
	}, [currentUser, userForm]);

	const testOfFire = (values) => {
		console.log(values)
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
				onFinish={testOfFire}
				initialValues={initFormValues}
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: "Name is required",
						},
					]}
				>
					<Input placeholder="Enter your name" />
				</Form.Item>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "Email is required",
						},
						{
							type: "email",
							message: "Invalid email",
						},
					]}
				>
					<Input placeholder="Enter your email" />
				</Form.Item>
				<Form.Item
					label="phone"
					name="phone"
					rules={[
						{
							required: true,
							message: "Phone is required",
						},
					]}
				>
					<Input placeholder="Enter your phone" />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="Confirm Password"
					name="confirmPassword"
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The two passwords that you entered do not match!'));
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
