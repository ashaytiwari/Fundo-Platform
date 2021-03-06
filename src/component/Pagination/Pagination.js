import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";
import { IconButton } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handleResetPagination } from "../../redux/actions/ui.actions";

const Pagination = ({ data, dataLimit, RenderComponent, WrapperComponent }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const resetPagination = useSelector((state) => state.ui.resetPagination);

  // useEffect to reset current page to 1 if filter get changed
  useEffect(() => {
    if (resetPagination) {
      setCurrentPage(1);
      dispatch(handleResetPagination(false));
    }
  }, [resetPagination, dispatch]);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / dataLimit));
    if (currentPage === Math.ceil(data.length / dataLimit)) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, [currentPage, data.length, dataLimit]);

  useEffect(() => {
    if (currentPage === 1) {
      setIsPrevDisabled(true);
    } else {
      setIsPrevDisabled(false);
    }
  }, [currentPage]);

  const navigateToFirstPage = () => {
    setCurrentPage(1);
  };

  const navigateToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const navigateToNextPage = () => {
    if (!isNextDisabled) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  const navigateToPrevPage = () => {
    if (!isPrevDisabled) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data?.slice(startIndex, endIndex);
  };

  return (
    <div className={styles.wrapper}>
      <WrapperComponent>
        {getPaginatedData()?.map((item, index) => (
          <RenderComponent data={item} keys={index} />
        ))}
      </WrapperComponent>
      <div className={styles.footer}>
        <IconButton onClick={navigateToFirstPage} className={styles.actionBtn}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={navigateToPrevPage} className={styles.actionBtn}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <p className={styles.infoText}>
          {t("common:paginationInfo", {
            currentPage: currentPage,
            totalPage: totalPages
          })}
        </p>
        <IconButton onClick={navigateToNextPage} className={styles.actionBtn}>
          <KeyboardArrowRightIcon />
        </IconButton>
        <IconButton onClick={navigateToLastPage} className={styles.actionBtn}>
          <LastPageIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Pagination;
