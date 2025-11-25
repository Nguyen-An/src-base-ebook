import { modalVariants } from '@/components/modal/Modals';
import { VariantProps } from 'class-variance-authority';
import { t } from 'i18next';
import { action, makeAutoObservable, observable } from 'mobx';
import React from 'react';

export default class ModalStore {
    instances: ModalInstance[] = [];

    constructor() {
        makeAutoObservable(this, {
            instances: observable,
            showModal: action.bound,
            hideModal: action.bound,
            hideAllModals: action.bound,
            showAlertModal: action.bound
        });
    }

    showModal(options?: ModalInstance) {
        const instance = new ModalInstance(options);
        this.instances.push(instance);
    }

    hideModal(id?: string) {
        if (id) {
            this.instances = this.instances.filter(ins => ins.id !== id);
        } else {
            this.instances.splice(-1, 1);
        }
    }

    hideModals(ids: string[]) {
        this.instances = this.instances.filter(ins => !ins?.id || !ids.includes(ins.id));
    }

    hideAllModals() {
        this.instances = [];
    }

    showAlertModal({
        id,
        type,
        content,
        cancelButton,
        onCancel,
        saveButton,
        onSave,
        ...options
    }: ModalInstance = {}) {
        this.showModal({
            type,
            cancelButton: cancelButton ?? t('words_title.cancel'),
            saveButton: saveButton ?? t('words_title.save'),
            onCancel: () => {
                this.hideModal(id);
                onCancel?.();
            },
            onSave: () => {
                this.hideModal(id);
                onSave?.();
            },
            content: (
                <div className='text-center'>{content}</div>
            ),
            ...options
        });
    }
}

class ModalInstance {
    id?: string;
    type?: VariantProps<typeof modalVariants>['type'];
    size?: VariantProps<typeof modalVariants>['size'];
    // header
    title?: string;
    titleClassName?: string;
    description?: string;
    headerRender?: React.ReactNode;
    // close button
    showCloseIcon?: boolean;
    // content
    content?: React.ReactNode;
    contentClassName?: string;
    closeWhenOutside?: boolean;
    // footer
    footer?: React.ReactNode;
    footerClassName?: string;
    cancelButton?: React.ReactNode;
    cancelButtonClassName?: string;
    onCancel?: Function;
    saveButton?: React.ReactNode;
    saveButtonClassName?: string;
    onSave?: Function;

    constructor({
        showCloseIcon = true,
        closeWhenOutside = false,
        type = 'default',
        size = 'default',
        ...options
    }: ModalInstance = {}) {
        this.id = options.id;
        this.type = type;
        this.size = size;
        this.title = options.title;
        this.titleClassName = options.titleClassName;
        this.description = options.description;
        this.headerRender = options.headerRender;
        this.showCloseIcon = showCloseIcon;
        this.content = options.content;
        this.contentClassName = options.contentClassName;
        this.closeWhenOutside = closeWhenOutside;
        this.footer = options.footer;
        this.footerClassName = options.footerClassName;
        this.cancelButton = options.cancelButton;
        this.cancelButtonClassName = options.cancelButtonClassName;
        this.onCancel = options.onCancel;
        this.saveButton = options.saveButton;
        this.saveButtonClassName = options.saveButtonClassName;
        this.onSave = options.onSave;
    }
}
