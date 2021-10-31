export type MaskType = "number" | "cpf" | "cnpj" | "phone" | "cep" | "money";

export function maskCpf(text: string = ""): string;

export function maskCnpj(text: string = ""): string;

export function maskPhone(text: string = ""): string;

export function maskCep(text: string = ""): string;

export function maskDate(text: string = ""): string;

export function maskMoney(text: string = ""): string;

export function maskText(
  maskType: MaskType,
  onChangeText: (text?: string) => void
): (text: string) => void;
