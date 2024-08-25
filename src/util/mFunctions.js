import { generateMnemonic } from "bip39";

const genM = () => {
    const generate_mnemonic = generateMnemonic();
    console.log("M---->\n",generate_mnemonic);

    return generate_mnemonic;
}





export { genM, }