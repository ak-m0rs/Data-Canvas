// File: src/utils/theme.ts
import { defineStyleConfig } from '@chakra-ui/react';

const buttonTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: 'blue',
  },
});

const theme = {
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Button: buttonTheme,
  },
};

export default theme;