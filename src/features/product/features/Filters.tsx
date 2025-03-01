import React, { useEffect } from "react";

// Mantine
import { Autocomplete, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

// Redux
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  selectNameProduct,
  setParamsProduct,
} from "../../../redux/features/product/productSlice";
import { IconCalendarMonth, IconSearch } from "@tabler/icons-react";

const Filters: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { dataProduct, paramsProducts } = useAppSelector(selectNameProduct);

  // Campaign
  useEffect(() => {
    console.log("dataProduct", dataProduct);
  }, [dataProduct]);

  // Function to handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    // Handle empty or cleared values by resetting to an empty string
    if (value === "") {
      dispatch(setParamsProduct({ [key]: "" }));
    } else {
      dispatch(setParamsProduct({ [key]: value }));
    }
  };

  return (
    <>
      {/* Filter Fields */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-2 my-4 w-full max-w-[700px]">
        {dataProduct?.filters.map((filter: any, filterIndex: any) =>
          filter?.details.map((field: any, fieldIndex: any) => {
            const commonProps = {
              key: field.key || `${filterIndex}-${fieldIndex}`,
              label: field.label,
              style: field.is_hidden ? { display: "none" } : {},
              value: paramsProducts[field.key] || "", // Ensure value is controlled
              // placeholder: field.placeholder || "",
            };

            if (field.type === "text") {
              return (
                <TextInput
                  placeholder={`- Select ${field.label} -`}
                  {...commonProps}
                  onChange={(e) =>
                    handleFilterChange(field.key, e.target.value)
                  }
                />
              );
            } else if (field.type === "autocomplete") {
              return (
                <Autocomplete
                  {...commonProps}
                  leftSectionPointerEvents="none"
                  leftSection={<IconSearch />}
                  placeholder={
                    field.placeholder || "Search campaign I.D: 00001"
                  }
                  data={field.option?.map((option: any) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  onChange={(value) => handleFilterChange(field.key, value)}
                />
              );
            } else if (field.type === "date") {
              return (
                <DateInput
                  clearable
                  placeholder={`- Select ${field.label} -`}
                  {...commonProps}
                  leftSection={<IconCalendarMonth />}
                  onChange={(value) => handleFilterChange(field.key, value)}
                />
              );
            } else {
              return null;
            }
          })
        )}
      </div>
    </>
  );
};

export default Filters;
