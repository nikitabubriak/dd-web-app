import { MenuItem, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormInputProps {
    name: string;
    control: any;
    label: string;
    setValue?: any;
    options: any;
    helperText: string;
}

export default function ReactHookFormSelect
    ({ name, control, label, options, helperText }: FormInputProps) {

    const generateSingleOptions = () => {
        return options.map((option: any) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            );
        });
    };

    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Controller
                render={({ field: { onChange, value } }) => (
                    <Select onChange={onChange} value={value} label={label}>
                        {generateSingleOptions()}
                    </Select>
                )}
                control={control}
                name={name}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};