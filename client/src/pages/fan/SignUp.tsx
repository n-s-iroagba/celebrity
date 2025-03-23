import React, { useMemo, useState } from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import '../../assets/styles/Auth.css';
import Logo from '../../components/Logo';
import AuthOption from '../../components/AuthOption';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MiniFooter from '../../components/MiniFooter';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../components/ErrorMessage';
import { postWithNoAuth } from '../../utils/apiUtils';
import { fanSignUpUrl } from '../../data/urls';


type FanData = {
  firstName: string;
  surname: string;
  dateOfBirth: Date | null;
  country: string;
  gender: string;
  email: string;
  whatsappNumber: string;
  password: string;
  confirmPassword: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [fanData, setFanData] = useState<FanData>({
    firstName: '',
    surname: '',
    dateOfBirth: null,
    country: '',
    gender: '',
    email: '',
    whatsappNumber: '',
    password: '',
    confirmPassword: '',
  });


  const [errors,setErrors] = useState <Record<string, string>> ({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
  const options = useMemo(() => countryList().getData(), []);
  const [startDate, setStartDate] = useState(new Date());

  const showPassword = () => {
    setPasswordType((prev) => (prev === 'text' ? 'password' : 'text'));
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFanData({ ...fanData, [event.target.name]: event.target.value });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fanData.firstName.trim()) newErrors.firstName = 'First Name is required.';
    if (!fanData.surname.trim()) newErrors.surname = 'Surname is required.';
    if (!fanData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.';
    if (!fanData.country) newErrors.country = 'Country is required.';
    if (!fanData.gender) newErrors.gender = 'Gender is required.';
    if (!fanData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(fanData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!fanData.password) {
      newErrors.password = 'Password is required.';
    } else if (fanData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  

    if (!validateForm()) {
      return; 
    }

    setSubmitting(true);
    setErrorMessage('');
    try {
      await postWithNoAuth<FanData,string>(fanSignUpUrl, fanData);
      navigate('/waiting-for-response')
      }catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <>
      <div className="responsive-padding-sides bg-light my-4">
        <div className="my-3">
          <AuthOption route={'temp'} title={'Already have an account?'} buttonText={'Login'} />
        </div>
        <p className="text-sm text-muted text-center">
          <small>
            Please Kindly sign up, We'll use your email and preferred contact method to send you important information about your request.
          </small>
        </p>

        <Form className="form-wrapper p-2 pb-5" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center my-3">
            <Logo />
          </div>
          <h6 className="text-center">Sign Up</h6>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="text-sm text-neutral-950 mb-2">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              className="custom-input"
              name="firstName"
              value={fanData.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label className="text-sm text-neutral-950 mb-2">Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your surname"
              className="custom-input"
              name="surname"
              value={fanData.surname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex gap-3 flex-wrap align-items-center" controlId="validationFormik04">
            <Form.Label>Date of birth</Form.Label>
            <DatePicker
              className="bg-light date-input text-center"
              selected={startDate}
              onChange={(date: any) => {
                setFanData({ ...fanData, dateOfBirth: date });
                setStartDate(date);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationFormik04">
            <Form.Label>Country of residence</Form.Label>
            <Select
              options={options}
              onChange={(e: any) => setFanData({ ...fanData, country: e.label })}
              className="bg-light date-input"
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId="validationFormik04">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            onChange={(e) => setFanData({ ...fanData, gender: e.target.value })}
            className='bg-light form-control'>
            <option className='primary-background' value={'male'}>Select your gender</option>
            <option className='primary-background' value={'male'}>Male</option>
            <option className='primary-background' value={'female'}>Female</option>
            <option className='primary-background' value={'non-binary'}>Non-binary</option>
          </Form.Select>
        </Form.Group>


          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-sm text-neutral-950 mb-2">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              className="custom-input"
              name="email"
              value={fanData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactNumber">
            <Form.Label className="text-sm text-neutral-950 mb-2">
                Whatsapp Number
              <FontAwesomeIcon icon={faWhatsapp} className="me-2" />
            </Form.Label>
            <Form.Control
              type="tel"
              name='whatsappNumber'
              placeholder={`Enter your Whatsapp number`}
              className="custom-input"
              value={fanData.whatsappNumber}
              required
              pattern="^\+?[1-9]\d{1,14}$"
              maxLength={15}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">Please enter a valid phone number (e.g., +1234567890).</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                required
                name="password"
                value={fanData.password}
                onChange={handleChange}
                className="custom-input bg-transparent form-control text-light"
              />
              <InputGroup.Text onClick={showPassword}>
                <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Confirm password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                required
                name="confirmPassword"
                value={fanData.confirmPassword}
                onChange={handleChange}
                className="custom-input bg-transparent form-control text-light"
              />
              <InputGroup.Text onClick={showPassword}>
                <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button type="submit" className="auth-button" disabled={submitting}>
            {submitting ? <Spinner as="span" animation="border" size="sm" /> : 'Sign Up'}
          </Button>
        </Form>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      {Object.keys(errors).length > 0 && (
  <div className="alert alert-danger mt-3">
    <ul className="mb-0">
      {Object.values(errors).map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  </div>
)}
      </div>
      

      <MiniFooter />
    </>
  );
};

export default SignUp;
