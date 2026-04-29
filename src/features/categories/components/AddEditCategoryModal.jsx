import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Modal from "../../../shared/ui/Modal";
import {
  CATEGORY_PRODUCT_LIMIT_OPTIONS,
  CATEGORY_STATUS_OPTIONS,
  DEFAULT_CATEGORY_FORM,
} from "../constants/categories.constants";
import SubcategoryTagsInput from "./SubcategoryTagsInput";

function FieldCard({ label, children }) {
  return (
    <div className="rounded-[8px] bg-[#FAF8F7] px-3 py-3">
      <label className="block text-[12px] leading-none text-[#7E7671]">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function SelectField({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="h-[24px] w-full appearance-none border-none bg-transparent p-0 pr-7 text-[15px] text-[#151210] outline-none"
      >
        {options.map((option) => (
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
  );
}

export default function AddEditCategoryModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  submitting = false,
}) {
  const [form, setForm] = useState(DEFAULT_CATEGORY_FORM);
  const [subcategoryInput, setSubcategoryInput] = useState("");

  useEffect(() => {
    if (!open) return;
    setForm(initialValues || DEFAULT_CATEGORY_FORM);
    setSubcategoryInput("");
  }, [initialValues, open]);

  const title = useMemo(() => {
    return form.id ? "Edit Category" : "Add new Category";
  }, [form.id]);

  const canSubmit = form.categoryName.trim().length > 0;

  const updateField = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const addSubcategory = () => {
    const normalized = subcategoryInput.trim();
    if (!normalized) return;

    if (form.subcategories.includes(normalized)) {
      setSubcategoryInput("");
      return;
    }

    updateField("subcategories", [...form.subcategories, normalized]);
    setSubcategoryInput("");
  };

  const removeSubcategory = (item) => {
    updateField(
      "subcategories",
      form.subcategories.filter((subcategory) => subcategory !== item)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) return;

    await onSubmit({
      ...form,
      categoryName: form.categoryName.trim(),
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description="Please add the below information to add new category."
      size="xs"
      contentClassName="max-w-[392px] rounded-[14px]"
      bodyClassName="space-y-2.5 pt-3"
      showClose={false}
    >
      <form id="category-form" onSubmit={handleSubmit} className="space-y-2.5">
        <FieldCard label="Category Name">
          <input
            type="text"
            value={form.categoryName}
            onChange={(event) => updateField("categoryName", event.target.value)}
            className="w-full border-none bg-transparent p-0 text-[15px] text-[#151210] outline-none"
          />
        </FieldCard>

        <FieldCard label="Subcategory">
          <SubcategoryTagsInput
            items={form.subcategories}
            inputValue={subcategoryInput}
            onInputChange={setSubcategoryInput}
            onAdd={addSubcategory}
            onRemove={removeSubcategory}
          />
        </FieldCard>

        <FieldCard label="Product Limitation">
          <SelectField
            value={form.productLimit}
            onChange={(event) => updateField("productLimit", event.target.value)}
            options={CATEGORY_PRODUCT_LIMIT_OPTIONS}
          />
        </FieldCard>

        <FieldCard label="Status">
          <SelectField
            value={form.status}
            onChange={(event) => updateField("status", event.target.value)}
            options={CATEGORY_STATUS_OPTIONS}
          />
        </FieldCard>

        <button
          type="submit"
          form="category-form"
          disabled={!canSubmit || submitting}
          className="inline-flex h-[46px] w-full items-center justify-center bg-[#E4B2B2] px-4 text-[16px] font-medium text-[#151210] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Saving..." : "Confirm"}
        </button>
      </form>
    </Modal>
  );
}