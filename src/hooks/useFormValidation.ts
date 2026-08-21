import { useForm } from 'react-hook-form';

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface OTPFormData {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

// Validation constants
const VALIDATION = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
  },
  otp: {
    required: 'OTP is required',
    pattern: {
      value: /^[0-9]{6}$/,
      message: 'OTP must be 6 digits',
    },
  },
  confirmPassword: {
    required: 'Please confirm your password',
  },
};

export const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData, callback: (data: SignInFormData) => Promise<void>) => {
    try {
      await callback(data);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  return {
    register,
    handleSubmit: (callback: (data: SignInFormData) => Promise<void>) => 
      handleSubmit((data) => onSubmit(data, callback)),
    errors,
    isSubmitting,
    reset,
    validation: VALIDATION,
  };
};

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormData>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: SignUpFormData, callback: (data: SignUpFormData) => Promise<void>) => {
    try {
      await callback(data);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const confirmPasswordValidation = {
    ...VALIDATION.confirmPassword,
    validate: (value: string) => value === password || 'Passwords do not match',
  };

  return {
    register,
    handleSubmit: (callback: (data: SignUpFormData) => Promise<void>) => 
      handleSubmit((data) => onSubmit(data, callback)),
    errors,
    isSubmitting,
    reset,
    password,
    validation: VALIDATION,
    confirmPasswordValidation,
  };
};

export const useForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData, callback: (data: ForgotPasswordFormData) => Promise<void>) => {
    try {
      await callback(data);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  return {
    register,
    handleSubmit: (callback: (data: ForgotPasswordFormData) => Promise<void>) => 
      handleSubmit((data) => onSubmit(data, callback)),
    errors,
    isSubmitting,
    reset,
    validation: VALIDATION,
  };
};

export const useOTPForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OTPFormData>({
    mode: 'onBlur',
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data: OTPFormData, callback: (data: OTPFormData) => Promise<void>) => {
    try {
      await callback(data);
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  };

  const confirmPasswordValidation = {
    ...VALIDATION.confirmPassword,
    validate: (value: string) => value === newPassword || 'Passwords do not match',
  };

  return {
    register,
    handleSubmit: (callback: (data: OTPFormData) => Promise<void>) => 
      handleSubmit((data) => onSubmit(data, callback)),
    errors,
    isSubmitting,
    reset,
    validation: VALIDATION,
    confirmPasswordValidation,
  };
};
