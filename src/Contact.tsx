import { ReactElement, useCallback, useMemo, useState } from "react";
import { Section } from "./Section";
import { Button, TextField } from "@mui/material";
import { Email } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const validEmail = (email: string) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

const emptyFields = {
  name: "",
  email: "",
  message: "",
};

enum ContactStatus {
  Idle = "idle",
  Sending = "sending",
  Sent = "sent",
}

interface ContactFields {
  name: string;
  email: string;
  message: string;
}

type ContactErrors = { [key in keyof ContactFields]?: string };

export function Contact(): ReactElement {
  const { t } = useTranslation();
  const [fields, setFields] = useState<ContactFields>({ ...emptyFields });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState(ContactStatus.Idle);

  const handleChange = useCallback(
    (field: keyof ContactFields, value: string) => {
      setStatus(ContactStatus.Idle);
      setErrors((prevState) => ({ ...prevState, [field]: "" }));
      setFields((prevState) => ({ ...prevState, [field]: value }));
    },
    []
  );

  const isDisabled = useMemo(() => status == ContactStatus.Sending, [status]);

  const renderInput = useCallback(
    (
      type: "text" | "email",
      label: string,
      field: keyof ContactFields,
      extraProps: Partial<unknown> = {}
    ) => (
      <TextField
        name={field}
        type={type}
        label={label}
        inputProps={{
          onChange: (e: React.FormEvent<HTMLInputElement>) =>
            handleChange(field, e.currentTarget.value),
        }}
        value={fields[field]}
        error={!!errors[field]}
        helperText={errors[field]}
        disabled={isDisabled}
        sx={{
          width: "100%",
          marginBottom: "10px",
        }}
        {...extraProps}
      />
    ),
    [errors, fields, isDisabled, handleChange]
  );

  const validate = useCallback(() => {
    const { name, email, message } = fields;
    const errors: ContactErrors = {};
    if (!name) errors["name"] = t("contact.form.errors.blankName");
    if (!email) errors["email"] = t("contact.form.errors.blankEmail");
    else if (!validEmail(email))
      errors["email"] = t("contact.form.errors.invalidEmail");
    if (!message) errors["message"] = t("contact.form.errors.blankMessage");

    setErrors(errors);
    return !Object.keys(errors).length;
  }, [fields, t]);

  const onSend = useCallback(async () => {
    if (!validate()) return;

    try {
      setStatus(ContactStatus.Sending);

      const response = await fetch(
        `https://formspree.io/${process.env.REACT_APP_CONTACT_EMAIL}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fields),
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      setErrors({});
      setFields({ ...emptyFields });
      setStatus(ContactStatus.Sent);
    } catch (e: unknown) {
      setErrors({
        message: (e as ErrorEvent).message ?? t("contact.form.errors.unknown"),
      });
      setStatus(ContactStatus.Idle);
    }
  }, [fields, validate, t]);

  return (
    <Section greetings={<div>{t("contact.title")}</div>}>
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          padding: "0 10px 10px 10px",
        }}
      >
        {renderInput("text", t("contact.form.name"), "name")}
        {renderInput("email", t("contact.form.email"), "email")}
        {renderInput("text", t("contact.form.message"), "message", {
          multiline: true,
          rows: 6,
        })}
        <Button
          startIcon={status === ContactStatus.Sent ? <Email /> : undefined}
          disabled={isDisabled}
          color={status === ContactStatus.Sent ? "success" : undefined}
          sx={{
            pointerEvents: status === ContactStatus.Sent ? "none" : undefined,
          }}
          onClick={onSend}
          variant="contained"
        >
          {t(`contact.form.status.${status}`)}
        </Button>
      </div>
    </Section>
  );
}
