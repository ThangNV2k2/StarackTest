import React, { useContext, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    TextField,
    Link,
    Breadcrumbs,
    FormControl,
    FormHelperText,
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import {RoleEnum} from "../../enum";
import useLazyApiCall, { baseUrl } from '../../hooks/useLazyApiCall';
import { AuthContext } from '../../AuthContext';
import { UserInfo } from '../../interface';
import { useLoginMutation } from '../../redux/auth-api';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required')
});

const Login: React.FC = () => {
    const [triggerLogin, { data: loginData, isLoading: loginLoading, isSuccess, isError }] = useLoginMutation();
    const { userInfo, changeUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && loginData?.result) {
            changeUserInfo(loginData.result.userResponse, loginData.result.accessToken);
        }
    }, [isSuccess, loginData, changeUserInfo]);

    useEffect(() => {
        if(userInfo) {
            navigate('/admin/user_management');
        }
    }, [userInfo]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await triggerLogin({
                email: values.email,
                password: values.password,
                roles: [RoleEnum.ADMIN]
            });
        },
    });

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{
                height: "54px"
            }}>
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
                height: "364",
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
                            Log in
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" color="primary" underline="none">
                                Register
                            </Link>
                        </Typography>
                    </Box>
                    <CloseIcon sx={{padding: '16px'}} color={"action"} />
                </Box>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}>
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
                                        borderRadius: '8px',
                                        height: '56px',
                                        '& input': {
                                            height: 'auto',
                                            marginTop: "12px",
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
                                            marginTop: "12px",
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

                        <Button variant="contained" color="primary" type="submit"  sx={{
                            width: "100%",
                            height: "42px",
                            borderRadius: "12px",
                            textTransform: "none"
                        }}>
                            Log in
                        </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default Login;
