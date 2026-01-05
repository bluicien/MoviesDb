import type { Meta, StoryObj } from "@storybook/react-vite";
import SignupForm from "../features/auth/components/SignupForm";
import { MemoryRouter } from "react-router";


const meta: Meta<typeof SignupForm> = {
  title: "Auth/SignupForm",
  component: SignupForm,
  decorators: [
    (RenderStory) => (
      <MemoryRouter>
        <RenderStory />
      </MemoryRouter>
    )
  ],
};
export default meta;

type Story = StoryObj<typeof SignupForm>;

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
