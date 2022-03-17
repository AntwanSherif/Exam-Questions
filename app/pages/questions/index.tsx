import { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestions from "app/questions/queries/getQuestions"
import { Box, Button, ButtonGroup, List, ListIcon, ListItem, UnorderedList } from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Link } from "app/core/components/Link"

const ITEMS_PER_PAGE = 100

export const QuestionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ questions, hasMore }] = usePaginatedQuery(getQuestions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <UnorderedList spacing={3}>
        {questions.map((question) => (
          <ListItem key={question.id}>
            <Link href={Routes.ShowQuestionPage({ questionId: question.id })}>{question.text}</Link>

            <List>
              {question.choices.map((choice) => (
                <ListItem key={choice.id}>
                  <ListIcon as={ChevronRightIcon} color="green.500" />
                  {choice.text} - {choice.votes} votes
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </UnorderedList>

      <Box mt={5}>
        <ButtonGroup variant="outline" spacing="2">
          <Button disabled={page === 0} onClick={goToPreviousPage} width="90px">
            Previous
          </Button>
          <Button disabled={!hasMore} onClick={goToNextPage} width="90px">
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}

const QuestionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>

      <div>
        <Box mb={5}>
          <Link href={Routes.NewQuestionPage()}>Create Question</Link>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsList />
        </Suspense>
      </div>
    </>
  )
}

QuestionsPage.authenticate = true
QuestionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionsPage
