import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    TextField,
    Link,
    Breadcrumbs,
    FormControl,
    FormHelperText,
    Typography,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import {AccountTypeEnum, RoleEnum, StatusEnum} from "../../enum";
import {useNavigate} from "react-router-dom";
import useLazyApiCall, { baseUrl } from '../../hooks/useLazyApiCall';
import { useRegisterMutation } from '../../redux/auth-api';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .test('uppercase', 'Password must contain at least one uppercase letter', (value) =>
            /[A-Z]/.test(value)
        )
        .test('lowercase', 'Password must contain at least one lowercase letter', (value) =>
            /[a-z]/.test(value)
        )
        .test('number', 'Password must contain at least one number', (value) =>
            /[0-9]/.test(value)
        )
        .test('specialChar', 'Password must contain at least one special character', (value) =>
            /[\W_]/.test(value)
        )
        .min(8, 'Password must be at least 8 characters')
        .max(16, 'Password must not exceed 16 characters'),
    terms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions'),
});

const Register: React.FC = () => {
    const [triggerRegister, { data: registerData, isLoading, isError, isSuccess }] = useRegisterMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && registerData?.result) {
            navigate('/login');
        }
    }, [isSuccess, registerData]);
    
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            terms: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await triggerRegister({
                fullName: values.name,
                email: values.email,
                password: values.password,
                status: StatusEnum.WAITING,
                accountType: AccountTypeEnum.FREE,
                roles: [RoleEnum.ADMIN]
            })
        },
    });

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{ height: "54px" }}>
                <Link href="/" color="textPrimary" underline="none"
                      sx={{
                          display: 'flex',
                          gap: 1,
                      }}
                >
                    <ArrowBackIcon />
                    Back
                </Link>
            </Breadcrumbs>
            <Card sx={{
                width: "444px",
                paddingX: "24px",
                paddingY: "32px",
                display: 'flex',
                flexDirection: 'column',
                gap: 4
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                            Register
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Link href="/login" color="primary" underline="none">
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                    <CloseIcon sx={{ padding: '16px' }} color={"action"} />
                </Box>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}>
                    <FormControl fullWidth margin="none" error={formik.touched.name && Boolean(formik.errors.name)}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            variant="outlined"
                            error={formik.touched.name && !!formik.errors.name}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    height: '56px',
                                    '& input': {
                                        height: 'auto',
                                        marginTop: "10px",
                                        fontSize: '14px',
                                        fontWeight: "medium"
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    transform: 'translate(14px, 0px) scale(0.9)',
                                },
                                '& .MuiInputLabel-root.MuiFormLabel-filled': {
                                    transform: 'translate(14px, 0px) scale(0.9)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    legend: {
                                        display: 'none',
                                    },
                                },
                            }}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <FormHelperText>{formik.errors.name}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth margin="none" error={formik.touched.email && Boolean(formik.errors.email)}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email address"
                            variant="outlined"
                            error={formik.touched.email && !!formik.errors.email}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    height: '56px',
                                    '& input': {
                                        height: 'auto',
                                        marginTop: "8px",
                                        fontSize: '14px',
                                        fontWeight: "medium"
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    transform: 'translate(14px, 0px) scale(0.9)',
                                },
                                '& .MuiInputLabel-root.MuiFormLabel-filled': {
                                    transform: 'translate(14px, 0px) scale(0.9)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    legend: {
                                        display: 'none',
                                    },
                                },
                            }}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <FormHelperText>{formik.errors.email}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={formik.touched.password && Boolean(formik.errors.password)}>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            error={formik.touched.password && !!formik.errors.password}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    height: '56px',
                                    '& input': {
                                        height: 'auto',
                                        marginTop: "10px",
                                        fontSize: '14px',
                                        fontWeight: "medium"
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    transform: 'translate(14px, 0px) scale(0.9)',
                                },
                                '& .MuiInputLabel-root.MuiFormLabel-filled': {
                                    transform: 'translate(14px, 0px) scale(0.9)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    legend: {
                                        display: 'none',
                                    },
                                },
                            }}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <FormHelperText>{formik.errors.password}</FormHelperText>
                        )}
                    </FormControl>

                    {/* Terms and Conditions Checkbox */}
                    <FormControl fullWidth error={formik.touched.terms && Boolean(formik.errors.terms)}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="terms"
                                    name="terms"
                                    color="primary"
                                    checked={formik.values.terms}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            }
                            label={
                                <Typography variant="body2">
                                    I have read the{' '}
                                    <Link href="/terms" color="primary" underline="none">
                                        Terms and Conditions
                                    </Link>
                                </Typography>
                            }
                        />
                    </FormControl>

                    <Button variant="contained" color="primary" type="submit" sx={{
                        width: "100%",
                        height: "42px",
                        borderRadius: "12px",
                        textTransform: "none"
                    }}>
                        Register
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default Register;
