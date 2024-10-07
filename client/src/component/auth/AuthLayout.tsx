import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";

export const AuthLayout = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        width: '729.22px',*/}
            {/*        height: '80.92px',*/}
            {/*        position: 'absolute',*/}
            {/*        top: '386.61px',*/}
            {/*        left: '658.72px',*/}
            {/*        transform: 'rotate(-130deg)',*/}
            {/*        opacity: 0.3,*/}
            {/*        background: 'linear-gradient(130deg, #0EA5E9 100%, rgba(14, 165, 233, 0) 0%)',*/}
            {/*        filter: 'blur(100px)',*/}
            {/*    }}*/}
            {/* />*/}
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        width: '634.17px',*/}
            {/*        height: '80.92px',*/}
            {/*        position: 'absolute',*/}
            {/*        top: '365.8px',*/}
            {/*        left: '784.62px',*/}
            {/*        transform: 'rotate(-130deg)',*/}
            {/*        opacity: 0.3,*/}
            {/*        background: 'linear-gradient(-130deg, #6366F1 100%, rgba(99, 102, 241, 0) 0%)',*/}
            {/*        filter: 'blur(100px)',*/}
            {/*    }}*/}
            {/*/> */}
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        width: '830.61px',*/}
            {/*        height: '288.7px',*/}
            {/*        position: 'absolute',*/}
            {/*        top: '292.77px',*/}
            {/*        left: '1150.06px',*/}
            {/*        transform: 'rotate(-130deg)',*/}
            {/*        opacity: 0.3,*/}
            {/*        background: 'linear-gradient(-130deg, #14B8A6 100%, rgba(20, 184, 166, 0) 0%)',*/}
            {/*        filter: 'blur(100px)',*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        width: '634.17px',*/}
            {/*        height: '80.92px',*/}
            {/*        position: 'absolute',*/}
            {/*        top: '247.8px',*/}
            {/*        left: '1238.62px',*/}
            {/*        transform: 'rotate(-130deg)',*/}
            {/*        opacity: 0.3,*/}
            {/*        background: 'linear-gradient(-130deg, #6366F1 100%, rgba(99, 102, 241, 0) 0%)',*/}
            {/*        filter: 'blur(100px)',*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        width: '634.17px',*/}
            {/*        height: '112.95px',*/}
            {/*        position: 'absolute',*/}
            {/*        top: '345.21px',*/}
            {/*        left: '1539.16px',*/}
            {/*        transform: 'rotate(-130deg)',*/}
            {/*        opacity: 0.3,*/}
            {/*        background: 'linear-gradient(-130deg, #6366F1 100%, rgba(99, 102, 241, 0) 0%)',*/}
            {/*        filter: 'blur(100px)',*/}
            {/*    }}*/}
            {/*/>*/}
            <Outlet />
        </Box>
    );
};
