import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Select, MenuItem, InputLabel, FormControl, ListItemIcon, ListItemText, SelectChangeEvent } from "@mui/material";

// Флаги в виде emoji для компактности
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  // Текущее значение языка
  const currentLang = i18n.language.startsWith("fr")
    ? "fr"
    : i18n.language.startsWith("ru")
    ? "ru"
    : "en";


    const handleChange = (event: SelectChangeEvent) => {
      const lang = event.target.value as string;
      i18n.changeLanguage(lang);
      // Сохраняем выбор в localStorage для автозагрузки при следующем визите
      localStorage.setItem("i18nextLng", lang);
  };

  return (
    <Box sx={{ minWidth: 120, display: "flex", alignItems: "center", gap: 2 }}>
      <FormControl variant="outlined" size="small">
        <InputLabel id="language-select-label">{t("language.selector")}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={currentLang}
          onChange={handleChange}
          label={t("language.selector")}
          sx={{
            background: "var(--color-surface)",
            borderRadius: "var(--radius-base)",
            fontWeight: 500,
            minWidth: 120,
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                background: "var(--color-surface)",
                color: "var(--color-text)",
              },
            },
          }}
        >
          {LANGUAGES.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              <ListItemIcon sx={{ minWidth: 32, fontSize: 20 }}>{lang.flag}</ListItemIcon>
              <ListItemText>{lang.label}</ListItemText>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
