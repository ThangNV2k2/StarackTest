import { Chip } from "@mui/material";

type Variant = 'info' | 'success' | 'warning' | 'super' | 'default';

const variantColorMap: Record<Variant, { background: string; text: string }> = {
    info: { background: '#D0E8FF', text: '#0056B3' },
    success: { background: '#DFF5E1', text: '#007F5F' },
    warning: { background: '#FFF4E1', text: '#FF8C00' },
    super: { background: '#F3E5F5', text: '#8E24AA' },
    default: { background: '#F0F4F8', text: '#2C3E50' },
};

interface CustomChipProps {
    label: string;
    variant: Variant;
    fontsize?: string;
    fontWeight?: number | string;
    borderRadius?: string;
    height?: string;
}

export const CustomChip: React.FC<CustomChipProps> = ({ label, variant, fontWeight, fontsize, borderRadius, height }) => {
    const { background, text } = variantColorMap[variant];

    return (
        <Chip
            label={label}
            sx={{
                backgroundColor: background,
                color: text,
                borderRadius: borderRadius ? borderRadius : '12px',
                fontSize: fontsize ? fontsize : '12px',
                fontWeight: fontWeight ? fontWeight : 600,
                lineHeight: 1.5,
                height: height ? height : '32px',
            }}
        />
    );
};