import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Modal from "../../../shared/ui/Modal";
import { USER_STATUS_OPTIONS } from "../constants/users.constants";
import { validateUserForm } from "../utils/users.helpers";

const initialFormState = {
  fullName: "",
  email: "",
  status: "active",
};

function Field({ label, error, children }) {
  return (
    <div>
      <div className="bg-[#FAF8F7] p-4">
        <label className="block text-[13px] leading-none text-[#7E7671]">
          {label}
        </label>
        <div className="mt-3">{children}</div>
      </div>

      {error ? (
        <p className="mt-2 text-[13px] text-[#F04444]">{error}</p>
      ) : null}
    </div>
  );
}

export default function UserFormModal({
  open,
  onClose,
  mode = "create",
  initialValues,
  onSubmit,
  submitting = false,
}) {
  const [values, setValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;

    setValues({
      fullName: initialValues?.fullName ?? "",
      email: initialValues?.email ?? "",
      status: initialValues?.status ?? "active",
    });

    setErrors({});
  }, [open, initialValues]);

  const heading = useMemo(() => {
    return mode === "edit" ? "Edit user" : "Add new user";
  }, [mode]);

  const subtitle = useMemo(() => {
    return mode === "edit"
      ? "Please update the below information to edit user."
      : "Please add the below information to add new user.";
  }, [mode]);

  const handleChange = (field) => (event) => {
    setValues((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateUserForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await onSubmit?.(values);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={heading}
      subtitle={subtitle}
      maxWidthClassName="max-w-[476px]"
      panelClassName="bg-white"
      bodyClassName="bg-white"
      titleClassName="font-serif text-[24px] leading-none text-[#151210]"
      subtitleClassName="text-[15px] leading-[1.55] text-[#7B7672]"
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Full Name" error={errors.fullName}>
          <input
            type="text"
            value={values.fullName}
            onChange={handleChange("fullName")}
            placeholder="Kevin backer"
            className="w-full border-none bg-transparent p-0 text-[16px] text-[#151210] outline-none placeholder:text-[#151210]"
          />
        </Field>

        <Field label="Email address" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder="kevin45@gmail.com"
            className="w-full border-none bg-transparent p-0 text-[16px] text-[#151210] outline-none placeholder:text-[#151210]"
          />
        </Field>

        <Field label="Status" error={errors.status}>
          <div className="relative">
            <select
              value={values.status}
              onChange={handleChange("status")}
              className="w-full appearance-none border-none bg-transparent p-0 pr-8 text-[16px] text-[#151210] outline-none"
            >
              {USER_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown
              className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#151210]"
              strokeWidth={1.8}
            />
          </div>
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-[50px] w-full items-center justify-center bg-[#E4B2B2] px-6 text-[16px] font-medium text-[#151210] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Saving..." : "Confirm"}
        </button>
      </form>
    </Modal>
  );
}
