import React, { useRef } from 'react'
import Layout from '../AdminLayout/Layout'
import { Formik } from "formik";
import * as Yup from "yup";


export default function Addproduct() {

    const formikref = useRef('')

    const clearvalue = () => {
        console.log(formikref.current)
        const { setFieldValue } = formikref.current;
        setFieldValue('productname', '')
        setFieldValue('skucode', '')
        setFieldValue('category', 'shirt')

    }
    const baseurl = (images) => {
        for (let i = 0; i < images.length; i++) {
            base64(images[i])
        }
    }

    const base64 = (file) => {


        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);

        };

    }


    return (
        <>
            <Layout />

            <div className="main-section-left">



                <Formik
                    initialValues={{ productname: "", skucode: "", category: "" }}
                    innerRef={formikref}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        clearvalue()
                    }}
                    validationSchema={Yup.object().shape({
                        productname: Yup.string()
                            .required("productname Required"),
                        skucode: Yup.string()
                            .required("skucode Required"),
                        category: Yup.string()
                            .required("category Required")

                    })}

                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        } = props;
                        return (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <div className="container text-center cardStyle">
                                        <h1 className='text-center mb-5'>Add Product</h1>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="productname">Product Name:</label>
                                                <input

                                                    name="productname"
                                                    type="text"
                                                    placeholder="Enter your productname"
                                                    value={values.productname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.productname && touched.productname && "error"}
                                                />
                                                {errors.productname && touched.productname && (
                                                    <div className="input feedback">{errors.productname}</div>
                                                )}
                                            </div>

                                            <div className="col-lg-6">
                                                <label htmlFor="skucode">Sku Code:</label>
                                                <input
                                                    name="skucode"
                                                    type="text"
                                                    placeholder="Enter your skucode"
                                                    value={values.skucode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.skucode && touched.skucode && "error"}
                                                />
                                                {errors.skucode && touched.skucode && (
                                                    <div className="input feedback">{errors.skucode}</div>
                                                )}
                                            </div>

                                            <div className="col-lg-6 mt-5">
                                                <label htmlFor="Category">Category:</label>

                                                <select
                                                    name="category"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.category && touched.category && "error"}
                                                >
                                                    <option value="" label="Select a color">
                                                        Select a color{" "}
                                                    </option>
                                                    <option value="Tshirt" label="T-shirt">
                                                        {" "}
                                                        T-shirt
                                                    </option>
                                                    <option value="Shirt" label="Shirt">
                                                        Shirt
                                                    </option>
                                                    <option value="shoes" label="shoes">
                                                        shoes
                                                    </option>
                                                </select>
                                                {errors.category && touched.category && (
                                                    <div className="input feedback">{errors.category}</div>
                                                )}

                                            </div>

                                            <div className="col-lg-6 mt-5">

                                                <label htmlFor="Category">Category:</label><br />
                                                <input type="file" name="" id="" multiple onChange={(event) => baseurl(event.target.files)} />
                                            </div>

                                            <div className="col-lg-12 mt-5 ">
                                                <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </>
                        );
                    }}
                </Formik>


            </div>
        </>
    )
}
