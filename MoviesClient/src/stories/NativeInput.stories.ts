import type { Meta, StoryObj } from "@storybook/react-vite";
import NativeInput from "../components/NativeInput";

const meta: Meta<typeof NativeInput> = {
  title: "NativeInput",
  component: NativeInput
};
export default meta;

type Story = StoryObj<typeof NativeInput>;

export const StandardInput: Story = {
  args: {
    label: "username",
    type: "text",
    placeholder: "johndoe"
  }
};