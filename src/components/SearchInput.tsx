import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />} />
      <Input variant="filled" placeholder="Search games..." borderRadius={20} />
    </InputGroup>
  );
};

export default SearchInput;
