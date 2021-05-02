import React, { ReactElement, useCallback, useMemo, useState } from "react";
import Button from "react-toolbox/lib/button/Button";
import Input, { InputProps } from "react-toolbox/lib/input/Input";
import { Section } from "./Section";
import styles from "./Contact.module.css";

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
  Sent = "Sent",
}

interface ContactFields {
  name: string;
  email: string;
  message: string;
}

type ContactErrors = { [key in keyof ContactFields]?: string };

export function Contact(): ReactElement {
  const [fields, setFields] = useState<ContactFields>({ ...emptyFields });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState(ContactStatus.Idle);

  const handleChange = useCallback(
    (field: keyof ContactFields, value: string) => {
      setErrors((prevState) => ({ ...prevState, [field]: "" }));
      setFields((prevState) => ({ ...prevState, [field]: value }));
    },
    []
  );

  const isDisabled = useMemo(() => status !== ContactStatus.Idle, [status]);

  const renderInput = useCallback(
    (
      type: "text" | "email",
      label: string,
      field: keyof ContactFields,
      extraProps: Partial<InputProps> = {}
    ) => (
      <Input
        className={styles.input}
        name={field}
        type={type}
        label={label}
        onChange={(value: string) => handleChange(field, value)}
        value={fields[field]}
        error={errors[field]}
        disabled={isDisabled}
        {...extraProps}
      />
    ),
    [errors, fields, isDisabled, handleChange]
  );

  const validate = useCallback(() => {
    const { name, email, message } = fields;
    const errors: ContactErrors = {};
    if (!name) errors["name"] = "Name can't be blank";
    if (!email) errors["email"] = "Email can't be blank";
    else if (!validEmail(email)) errors["email"] = "Email is invalid";
    if (!message) errors["message"] = "Message can't be blank";

    setErrors(errors);
    return !Object.keys(errors).length;
  }, [fields]);

  const onSend = useCallback(async () => {
    if (!validate()) return;

    try {
      setStatus(ContactStatus.Sending);

      const response = await fetch("https://formspree.io/skatiruas@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      setErrors({});
      setFields({ ...emptyFields });
      setStatus(ContactStatus.Sent);
    } catch (e) {
      setErrors({ message: e.message ?? "Unknown error, try again" });
      setStatus(ContactStatus.Idle);
    }
  }, [fields, validate]);

  return (
    <Section
      greetings={
        <div>
          If you are interested in <b>professional</b> or even <b>personal</b>{" "}
          contact, send me a message!
        </div>
      }
      childrenClassName={styles.form}
    >
      <div className={styles.inputHolder}>
        {renderInput("text", "Name", "name")}
        {renderInput("email", "Email", "email")}
        {renderInput("text", "Message", "message", {
          multiline: true,
          rows: 6,
        })}
        <Button
          icon={status === ContactStatus.Sent ? "email" : undefined}
          label={
            status === ContactStatus.Sent
              ? "The Email has been sent"
              : status === ContactStatus.Sending
              ? "Sending..."
              : "Send"
          }
          disabled={isDisabled}
          className={status === ContactStatus.Sent ? styles.sent : undefined}
          onClick={onSend}
          raised
          primary
        />
      </div>
    </Section>
  );
}
