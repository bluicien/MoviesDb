import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../app/hooks";
import { loginApi } from "./api";
import { setNewAccessToken } from "./authSlice";
import type { LoginRequest, LoginResponse } from "./schemas";
import type { AppError } from "../../libs/errors";

export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation<LoginResponse, AppError, LoginRequest>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      dispatch(setNewAccessToken(data.accessToken));
    }
  });
}
