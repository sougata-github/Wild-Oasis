/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import FormRow from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const editSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editValues : {},
  });

  const { errors } = formState;

  //custom hooks
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isSubmitting = isCreating || isEditing;

  function onSubmit(data) {
    const image =
      typeof data.imageUrl === "string" ? data.imageUrl : data.imageUrl[0];

    if (editSession) {
      editCabin({ newCabinData: { ...data, imageUrl: image }, id: editId });
    } else {
      createCabin(
        { ...data, imageUrl: image },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isSubmitting}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1!",
            },
          })}
          disabled={isSubmitting}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least $1",
            },
          })}
          disabled={isSubmitting}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              const discount = parseFloat(value);
              const regularPrice = parseFloat(getValues().regularPrice);

              return (
                discount <= regularPrice ||
                "Discount should be less than regular price!"
              );
            },
          })}
          disabled={isSubmitting}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isSubmitting}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="imageUrl"
          accept="image/*"
          type="file"
          {...register("imageUrl", {
            required: editSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSubmitting}>
          {editSession ? "Edit Cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
