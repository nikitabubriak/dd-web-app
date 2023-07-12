import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required(),
    genre: yup.string().required(),
    theme: yup.string().required(),
    price: yup.number().required().moreThan(100),
    quantityInStock: yup.number().required().min(0),
    description: yup.string().required(),
    image: yup.mixed().when('image', {
        is: (value: string) => !value,
        then: schema => schema.required('Please provide an image')
    })
})