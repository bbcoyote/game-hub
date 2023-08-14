import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    // Hstack is a component imported from chakra-ui. it stacks content in a Horizontal direction. there is also VStack for vertical stacking
    <HStack>
      {/* Switch is a compoment from chakra-ui. it's an on off switch in this case it is switching from darkmode to light mode */}
      <Switch
        colorScheme="cyan"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
