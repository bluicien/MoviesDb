import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../app/hooks";
import type { SignupRequest, SignupResponse } from "./schemas";
import type { AppError } from "../../libs/errors";
import { signupApi } from "./api";
import { setNewAccessToken } from "./authSlice";

export function useSignup() {
  const dispatch = useAppDispatch();

  return useMutation<SignupResponse, AppError, SignupRequest>({
    mutationKey: ["signup"],
    mutationFn: signupApi,
    retry: false,
    onSuccess: (data) => {
      dispatch(setNewAccessToken(data.accessToken));
    },
    meta: {
      feature: "auth",
      action: "signup"
    }
  });
}
