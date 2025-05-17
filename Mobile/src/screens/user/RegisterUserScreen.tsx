import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import { UserRule } from '../../lib/types/IUser'; // ajuste o caminho conforme sua estrutura
import { createUser } from '../../lib/api/users';
import  styles  from '../../screens/styles';

// Schema de validação
const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  rule: z.nativeEnum(UserRule),
});

type FormData = z.infer<typeof schema>;

export default function RegisterUserScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rule: UserRule.Student,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createUser(data);
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      reset();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao criar usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Usuário</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nome"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Senha"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Text style={styles.label}>Função</Text>
      <Controller
        control={control}
        name="rule"
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
            <Picker.Item label="Admin" value={UserRule.Admin} />
            <Picker.Item label="Professor" value={UserRule.Teacher} />
            <Picker.Item label="Aluno" value={UserRule.Student} />
          </Picker>
        )}
      />

      <Button title="Registrar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
