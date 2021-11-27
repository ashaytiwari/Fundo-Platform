import React, { useState } from "react";
import styles from "./ThemeToggler.module.scss";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { IconButton, Backdrop, MenuItem, Menu } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TranslateIcon from "@mui/icons-material/Translate";
import i18n from "../../i18n/i18n";
import { useTranslation } from "react-i18next";

const ThemeToggler = (props) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const { t } = useTranslation();

  const open = Boolean(languageAnchor);

  const handleClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setLanguageAnchor(null);
  };

  const panelHandler = () => {
    setIsPanelOpen((prevState) => !prevState);
  };

  // function to handle language changes
  const languageSelector = (e, langCode) => {
    i18n.changeLanguage(langCode);
    handleClose();
  };

  // function to switch color themes
  const switchTheme = (theme) => {
    const newTheme = theme;
    localStorage.setItem("COLOR_THEME", newTheme);
    props.setTheme(newTheme);
  };

  return (
    <div className={styles.themeToggler}>
      {isPanelOpen ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isPanelOpen}
        >
          <div className={styles.themePanel}>
            <div className={styles.header}>
              <h6>{t("common:settings")}</h6>
              <IconButton onClick={panelHandler} className={styles.closeBtn}>
                <CloseIcon />
              </IconButton>
            </div>

            {/* Language Section */}
            <div className={styles.modeSection}>
              <h6 className={styles.title}>{t("common:languages")}</h6>
              <div
                className={`${styles.card} ${styles.languageCard}`}
                onClick={handleClick}
              >
                <TranslateIcon />
              </div>
              <Menu anchorEl={languageAnchor} open={open} onClose={handleClose}>
                <MenuItem onClick={(e) => languageSelector(e, "en")}>
                  {t("common:english")}
                </MenuItem>
                <MenuItem onClick={(e) => languageSelector(e, "hi")}>
                  {t("common:hindi")}
                </MenuItem>
              </Menu>
            </div>
            {/* Language Section */}

            {/* Mode section */}
            <div className={styles.modeSection}>
              <h6 className={styles.title}>{t("common:mode")}</h6>
              <div className={"row"}>
                <div className={"col-md-6"}>
                  <div
                    className={`${styles.card} ${styles.lightBg}`}
                    onClick={() => switchTheme("light")}
                  >
                    <LightModeIcon />
                  </div>
                </div>
                <div className={"col-md-6"} onClick={() => switchTheme("dark")}>
                  <div className={`${styles.card} ${styles.darkBg}`}>
                    <DarkModeIcon />
                  </div>
                </div>
              </div>
            </div>
            {/* Mode section */}
          </div>
        </Backdrop>
      ) : (
        <div className={styles.themeBtn} onClick={panelHandler}>
          <SettingsSuggestIcon />
        </div>
      )}
    </div>
  );
};

export default ThemeToggler;
