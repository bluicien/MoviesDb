import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../features/auth/components/LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Auth/LoginForm",
  component: LoginForm,
  decorators: [
    (RenderStory) => (
      <MemoryRouter>
        <RenderStory />
      </MemoryRouter>
    )
  ],
  
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const FormPending: Story = {
  args: {
    onSubmit: (data) => console.log("Storybook submit:", data),
    isLoading: true,
    serverError: undefined,
  },
};

export const FormError: Story = {
  args: {
    onSubmit: (data) => console.log("Storybook submit:", data),
    isLoading: false,
    serverError: "Username is required.",
  },
};

export const FormStandby: Story = {
  args: {
    onSubmit: (data) => console.log("Storybook submit:", data),
    isLoading: false,
    serverError: undefined,
  },
};
