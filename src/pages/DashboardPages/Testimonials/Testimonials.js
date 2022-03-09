import React, { useState, useEffect, useCallback } from "react";

import { useDispatch } from "react-redux";

import { useSnackbar } from "notistack";

import { getTestimonialData } from "../../../services/commonServices";
import { setTestimonialData } from "../../../redux/actions/common.actions";

import TestimonialsContainer from "../../../component/Dashboard/Testimonials/TestimonialsContainer/TestimonialsContainer";
import Loader from "../../../component/Loader/Loader";

import styles from "./Testimonials.module.scss";

const Testimonials = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const getTestimonials = useCallback(() => {
    setIsLoading(true);
    getTestimonialData().then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
        dispatch(setTestimonialData(res.data));
      } else {
        setIsLoading(false);
        enqueueSnackbar(res.statusText, { variant: "error" });
      }
    });
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    getTestimonials();

    return () => {
      dispatch(setTestimonialData([]));
    };
  }, [dispatch, getTestimonials]);

  if (isLoading === true) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={"text-center"}>
        <h4>What Our Client Says</h4>
        <p>
          Our clients send us bunch of smiles with our services and we love them
        </p>
      </div>
      <div className={styles.body}>
        <TestimonialsContainer />
      </div>
    </div>
  );
};

export default Testimonials;
