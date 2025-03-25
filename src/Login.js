import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './App'; // Changed from '../context/AuthContext'
import pizzaVideo from './pizza.mp4'; // Make sure this path is correct

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components (must be defined before they're used)
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: rgba(0, 0, 0, 0.7);
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const LoginForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
`;

const InputContainer = styled.div`
  position: relative;
  margin: 1rem 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff6b6b;
  }
`;

const Icon = styled.span`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: rgba(253, 214, 18, 0.7);
  z-index: 1;
`;

const TogglePassword = styled.span`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  z-index: 1;
`;

const PasswordStrength = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const StrengthBar = styled.div`
  height: 100%;
  width: ${(props) => props.strength}%;
  background: ${(props) =>
    props.strength < 30 ? '#ff6b6b' : props.strength < 70 ? '#ffa500' : '#4caf50'};
  transition: width 0.3s ease;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin: 1.5rem 0;
  background: linear-gradient(135deg, #ff6b6b, #ff5252);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
    animation: ${pulse} 1s infinite;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
  margin-left: 0.5rem;
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  color: rgba(255, 255, 255, 0.7);
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Link = styled.a`
  color: #ff6b6b;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.div`
  margin: 1rem 0;
  color: ${(props) => (props.error ? '#ff6b6b' : '#4caf50')};
  font-size: 0.9rem;
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;

  a {
    color: #ff6b6b;
    text-decoration: none;
    margin: 0 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Main Login Component
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', error: false });
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', error: false });

    setTimeout(() => {
      if (email && password) {
        login();
        setMessage({ text: 'Login successful! Redirecting...', error: false });
        setTimeout(() => navigate('/home'), 1000);
      } else {
        setMessage({ text: 'Please enter both email and password', error: true });
      }
      setLoading(false);
    }, 2000);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength += 30;
    if (password.length > 8) strength += 30;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    setPasswordStrength(strength);
  };

  return (
    <LoginContainer>
      <BackgroundVideo autoPlay loop muted>
        <source src={pizzaVideo} type="video/mp4" />
      </BackgroundVideo>
      <LoginForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Slice & Dice</Title>
        <InputContainer>
          <Icon><FaEnvelope /></Icon>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <Icon><FaLock /></Icon>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              calculatePasswordStrength(e.target.value);
            }}
            required
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
          <PasswordStrength>
            <StrengthBar strength={passwordStrength} />
          </PasswordStrength>
        </InputContainer>
        <Options>
          <label>
            <Checkbox
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
          <Link href="#">Forgot Password?</Link>
        </Options>
        {message.text && <Message error={message.error}>{message.text}</Message>}
        <Button type="submit" disabled={loading}>
          {loading ? <><Spinner /> Logging in...</> : 'Login'}
        </Button>
        <SocialLogin>
          <SocialButton><FaGoogle size={20} /></SocialButton>
          <SocialButton><FaFacebook size={20} /></SocialButton>
          <SocialButton><FaApple size={20} /></SocialButton>
        </SocialLogin>
        <Footer>
          By logging in, you agree to our <Link href="#">Terms of Service</Link> and{' '}
          <Link href="#">Privacy Policy</Link>.
          <div style={{ marginTop: '1rem' }}>
            Don't have an account? <Link href="/Registration">Sign Up</Link>
          </div>
        </Footer>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;