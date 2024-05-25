import { registerUser } from "./api";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  return useMutation({
    mutationFn: (user) => registerUser(user),
  });
};

export { useRegister };
