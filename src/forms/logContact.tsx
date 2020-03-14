import * as React from 'react';
import DatePicker from 'react-date-picker';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/core';
import Select, { Option } from 'react-select';
import useAnalytics from '../helpers/useAnalytics';

const analytics = useAnalytics();

export type ContactWith = {
  name: string;
  id: string;
};

interface FormValues {
  entryDate: Date;
  contactWith: ContactWith[];
}

interface OtherProps {
  contactOptions: ContactWith[];
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    contactOptions,
    touched,
    errors,
    isSubmitting,
    setFieldValue
  } = props;

  return (
    <Form>
      <Field name="entryDate">
        {({ field }) => {
          return (
            <FormControl isInvalid={errors[field.name] && touched[field.name]}>
              <FormLabel htmlFor={field.name}>Entry Date</FormLabel>
              <DatePicker
                onChange={v => setFieldValue('entryDate', v)}
                value={field.value}
              />
              <FormErrorMessage>{errors.entryDate}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>

      <Field name="contactWith">
        {({ field }) => {
          return (
            <FormControl isInvalid={errors[field.name] && touched[field.name]}>
              <FormLabel htmlFor={field.name}>Entry Date</FormLabel>
              <Select
                getOptionLabel={(o: ContactWith) => o.name}
                getOptionValue={(o: ContactWith) => o.id}
                defaultValue={field.value}
                isMulti
                name={field.name}
                options={contactOptions}
                onChange={(option: Option) => {
                  console.log(option);
                  setFieldValue(field.name, option);
                }}
              />
              <FormErrorMessage>{errors.entryDate}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>

      <Button mt={4} variantColor="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </Form>
  );
};

interface LogContactFormProps {
  initialEntryDate?: Date;
  initialContactWith?: ContactWith[];
  contactOptions: ContactWith[];
}

// Wrap our form with the withFormik HoC
const LogContactForm = withFormik<LogContactFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      entryDate: props.initialEntryDate || new Date(),
      contactWith: props.initialContactWith || []
    };
  },

  handleSubmit: (values, actions) => {
    analytics.logEvent('contact_logged', {
      contact_with_quanitity: values.contactWith.length
    });
    actions.setSubmitting(false);
  }
})(InnerForm);

export default LogContactForm;