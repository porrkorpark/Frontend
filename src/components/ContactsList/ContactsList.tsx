import * as React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import { Spinner, Stack, Box, useToast, Text } from '@chakra-ui/core';
import useContacts from '../../hooks/useContacts';
import ContactAvatar from '../ContactAvatar/ContactAvatar';

const ContactsList: React.FC = () => {
  const [contacts, loading, error] = useContacts();
  const toast = useToast();
  const intl = useIntl();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    toast({
      title: intl.formatMessage({ id: 'ContactList.heading' }),
      description: intl.formatMessage({ id: 'ContactList.msg' }),
      status: 'error',
      isClosable: true
    });
    return <Text>😡</Text>;
  }

  return (
    <Stack spacing={2}>
      {contacts.map((uid) => (
        <Box key={uid}>
          <ContactAvatar uid={uid} />
        </Box>
      ))}
    </Stack>
  );
};

export default ContactsList;
