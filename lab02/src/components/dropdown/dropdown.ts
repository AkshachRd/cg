type DropdownOption = {
    lable: string;
    onClick?: (e: Event) => void;
}
export type DropdownContent = {
    title: string;
    options?: DropdownOption[];
};

export class Dropdown {
    public dropdown: HTMLDivElement | undefined;
    private options: DropdownOption[] | undefined; 

    constructor(dropdown: HTMLDivElement, content: DropdownContent) {
        dropdown.innerHTML = `
        <div class="dropdown">
            <button>${content.title}</button>
            <div class="dropdown-options" />
        </div>
        `;

        this.options = content.options;
        const dropdownOptions = dropdown.querySelector('.dropdown-options') as HTMLDivElement;

        this.addOptions(dropdownOptions);
        this.dropdown = dropdown;
    }

    dispose() {
        if (this.dropdown === undefined) {
            return;
        }

        const dropdownOptions = this.dropdown.querySelector('.dropdown-options') as HTMLDivElement;
        const optionNodes = [...dropdownOptions.querySelectorAll('a')];

        this.options?.forEach((option) => {
            const a = optionNodes.find((el) => el.textContent === option.lable);;

            if (option.onClick !== undefined) {
                a?.addEventListener('click', option.onClick);
            }
        });
    }

    private addOptions(dropdownOptions: HTMLDivElement) {
        this.options?.forEach((option) => {
            const a = document.createElement('a');
            a.href = "#";
            a.innerHTML = option.lable;
            if (option.onClick !== undefined) {
                a.addEventListener('click', option.onClick);
            }
            
            dropdownOptions.appendChild(a);
        });
    }

}