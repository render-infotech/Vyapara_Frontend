import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Form, Input, Label, Row } from "reactstrap";
import { Btn, H2, Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import {
  CreateAccount,
  DoNotAccount,
  Href,
  RememberPassword,
} from "../../../../utils/Constant";
import { useAppDispatch, useAppSelector } from "../../../../ReduxToolkit/Hooks";
import axiosCall from "../../../../Api/APIcall";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../../../ReduxToolkit/Reducers/Users/UserSlice";
import { AuthData } from "../../../../Type/Vyapara/Auth/User";

interface FormData {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
}

export interface AuthResponse {
  data: AuthData;
  message: string;
  status: number;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.user.loading);
  const loggedInUser = useAppSelector((state) => state.user.isLoggedIn);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    errors: {},
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;
    const errors: FormData["errors"] = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = "Email is required";
    else if (!emailPattern.test(email)) errors.email = "Enter a valid email";

    if (!password) errors.password = "Password is required";
    else if (password.length < 3)
      errors.password = "Password must be at least 3 characters";

    if (Object.keys(errors).length > 0) {
      setFormData((prev) => ({ ...prev, errors }));
      return;
    }

    try {
      dispatch(loginStart());
      const response = await axiosCall<AuthResponse>({
        ENDPOINT: "users/login",
        METHOD: "POST",
        PAYLOAD: { email, password },
      });

      dispatch(loginSuccess(response.data.data));
      toast.success(response.data.message);
      const redirectPath = sessionStorage.getItem("postLoginRedirect");
      sessionStorage.removeItem("postLoginRedirect");
      navigate(redirectPath || "/dashboard");
    } catch (err: any) {
      dispatch(loginFailure());
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  useEffect(() => {
    if (!loggedInUser) {
      navigate(`${process.env.PUBLIC_URL}/login`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card login-dark">
            <div className="login-main">
              <Link className="logo text-center" to={Href}>
                <Image
                  className="img-fluid"
                  height={75}
                  width={75}
                  src={dynamicImage("vyapara/vyapara-logo-removebg.png")}
                  alt="logo"
                />
              </Link>

              <Form className="theme-form" onSubmit={handleLogin}>
                <H2 className="text-center">Welcome to Vyapara</H2>
                <P className="text-center">
                  Enter your email & password to Sign In
                </P>
                <div className="form-group">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="Please enter your email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formData.errors.email && (
                    <div className="text-danger">{formData.errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <Label>Password</Label>
                  <div className="form-input position-relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Please enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <div
                      className="show-hide"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <span className="show"></span>
                    </div>
                  </div>
                  {formData.errors.password && (
                    <div className="text-danger">
                      {formData.errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group mb-0 checkbox-checked">
                  <div className="form-check checkbox-solid-info">
                    <Input id="checkbox1" type="checkbox" />
                    <Label htmlFor="checkbox1">{RememberPassword}</Label>
                    <Link to="/forgot-password"> Forgot Password?</Link>
                  </div>
                  <div className="text-end mt-3">
                    <Btn
                      color="primary"
                      block
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Btn>
                  </div>
                </div>

                <P className="mt-4 mb-0 text-center">
                  {DoNotAccount}
                  <Link className="ms-2" to="/user-registration">
                    {CreateAccount}
                  </Link>
                </P>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
