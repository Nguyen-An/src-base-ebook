import { Button } from '@/components/common/Button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/common/Form';
import { Input, PasswordInput } from '@/components/common/Input';
import { ROUTES } from '@/configs/constants';
import { useStore } from '@/hooks/useStore';
import yup from '@/services/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default observer(function LoginPage() {
    // hooks
    const { t } = useTranslation();
    const navigate = useNavigate();

    // store
    const { authStore: { login } } = useStore();

    // validate schema
    const validateSchema = yup.object().shape({
        email: yup
            .string()
            .email('form_error_validate.email')
            .required('form_error_validate.required'),
        password: yup.string().required('form_error_validate.required')
    });

    type FormData = yup.InferType<typeof validateSchema>;

    // state
    const form = useForm<FormData>({
        resolver: yupResolver(validateSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    // function
    const onSubmit = async (data: FormData) => {
        const { email, password } = data;
        const res = await flowResult(login({ email, password }));
        if (res) {
            navigate(ROUTES.home.href);
        }
    };

    return (
        <div className='lg:p-8'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 px-4 py-6 sm:p-6 min-w-[300px] sm:w-[400px] rounded-xl border bg-card text-card-foreground shadow mt'>
                <h3 className='text-center'>{t('words_title.sign_in')}</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('words_title.email')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t(
                                                    'words_title.email'
                                                )}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('words_title.password')}
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                type={!showPassword ? 'password' : 'text'}
                                                placeholder={t(
                                                    'words_title.password'
                                                )}
                                                onToggleIcon={() => setShowPassword(!showPassword)}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='text-center mt-8'>
                            <Button type='submit' className='min-w-32'>
                                {t('words_title.sign_in')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
});
