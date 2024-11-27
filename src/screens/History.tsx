import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";

import {
  Heading,
  Text,
  Toast,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryGroupByDayDTO } from "@dtos/HistoryGroupByDayDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryGroupByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const titleMessage = isAppError
        ? error.message
        : "Não foi possível carregar o histórico.";
      toast.show({
        placement: "top",
        render: () => (
          <Toast action="error" variant="outline" bgColor="$red500" mt="$24">
            <ToastTitle color="$white">{titleMessage}</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section }) => (
          <Heading
            color="$gray200"
            fontSize="$md"
            mt="$10"
            mb="$3"
            fontFamily="$heading"
          >
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0 && {
            flex: 1,
            justifyContent: "center",
          }
        }
        ListEmptyComponent={() => (
          <Text color="$gray100" textAlign="center">
            Não há exercícios registrados ainda.{`\n`} Vamos fazer exercícios
            hoje?
          </Text>
        )}
      />
    </VStack>
  );
}
