import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { editReader } from './readerApi'; // Убедитесь, что путь к импорту правильный

const emailPattern = /^[\w.-]+@(gmail\.com|yahoo\.com|icloud\.com|mail\.ru)$/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const EditReaderModal = ({ isOpen, onRequestClose, reader, onUpdateSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();

  // Обновление значений формы, когда reader изменяется
  useEffect(() => {
    if (reader) {
      reset({
        fullName: reader.fullName,
        email: reader.email,
        password: '' // Сброс поля пароля
      });
    }
  }, [reader, reset]);

  const onSubmit = async (data) => {
    if (!reader) return; // Проверьте, что reader загружен

    try {
      const updatedReader = await editReader(reader._id, data); // Вызовите функцию API
      onUpdateSuccess(updatedReader); // Передайте обновленного читателя
      reset(); // Сброс формы
      onRequestClose(); // Закройте модальное окно
    } catch (error) {
      setError("server", { type: "manual", message: error.response?.data?.message || 'Ошибка сервера' });
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={{ content: { width: '400px', margin: 'auto' } }}>
      <h2>Редактировать данные читателя</h2>
      {errors.server && <p style={{ color: 'red' }}>{errors.server.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Полное имя:
          <input
            type="text"
            {...register('fullName', { required: 'Полное имя обязательно' })}
            placeholder="Введите полное имя"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName.message}</p>}
        </label>
        <label>
          Email:
          <input
            type="email"
            {...register('email', {
              required: 'Поле email обязательно',
              pattern: {
                value: emailPattern,
                message: 'Неверный формат email. Используйте email от gmail.com, yahoo.com, icloud.com или mail.ru'
              }
            })}
            placeholder="Введите email"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </label>
        <label>
          Новый пароль:
          <input
            type="password"
            {...register('password', {
              validate: {
                strongPassword: value => value === '' || passwordPattern.test(value) || 'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ.'
              }
            })}
            placeholder="Введите новый пароль"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </label>
        <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Сохранить изменения</button>
        <button type="button" onClick={onRequestClose} style={{ width: '100%', marginTop: '10px' }}>Закрыть</button>
      </form>
    </Modal>
  );
};

export default EditReaderModal;
