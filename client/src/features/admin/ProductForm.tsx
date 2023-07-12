import { Box, Paper, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
// import { useEffect } from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import AppTextInput from "../../components/AppTextInput";
// import useProducts from "../../app/hooks/useProducts";
// import { yupResolver } from '@hookform/resolvers/yup';
// import { validationSchema } from "./productValidation";
// import agent from "../../app/api/agent";
// import { useAppDispatch } from "../../app/store/configureStore";
// import { setProduct } from "../catalog/catalogSlice";
// import { LoadingButton } from "@mui/lab";
// import AppSelectList from "../../components/AppSelectList";
// import AppDropzone from "../../components/AppDropzone";

interface Props {
    product?: Product;
    cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
    // const { control, reset, handleSubmit, watch, formState: { isDirty, isSubmitting } } = useForm({
    //     resolver: yupResolver(validationSchema)
    // });
    // const { genres, themes } = useProducts();
    // const watchImage = watch('image');
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (product && !watchImage && !isDirty) reset(product);
    //     return () => {
    //         if (watchImage) URL.revokeObjectURL(watchImage.preview);
    //     }
    // }, [product, reset, watchImage, isDirty])

    // async function updateSubmitData(data: FieldValues) {
    //     try {
    //         let response: Product;
    //         if (product) {
    //             response = await agent.Admin.updateProduct(data);
    //         } else {
    //             response = await agent.Admin.createProduct(data);
    //         }
    //         dispatch(setProduct(response));
    //         cancelEdit();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
            </Typography>
            {/* <form onSubmit={handleSubmit(updateSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Product name' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={genres} name='genre' label='Genre' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={themes} name='theme' label='Theme' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} type='number' name='price' label='Price' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} type='number' name='quantityInStock' label='Quantity in Stock' />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput control={control} multiline={true} rows={4} name='description' label='Description' />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <AppDropzone control={control} name='image' />
                            {watchImage ? (
                                <img src={watchImage.preview} alt="preview" style={{ maxHeight: 200 }} />
                            ) : (
                                <img src={product?.image} alt={product?.name} style={{ maxHeight: 200 }} />
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form> */}
        </Box >
    )
}