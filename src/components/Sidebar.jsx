import React from "react"
import {
    Avatar,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/core"
import { MdDashboard, MdList, MdSettings, MdAddBox } from "react-icons/md"
import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <>
            <Flex
                flex="1"
                justify="center"
                align="center"
                flexDirection="column"
            >
                <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                    showBorder="true"
                    ml="5"
                    mb="2"
                    size="xl"
                />
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                isActive={isOpen}
                                rightIcon="chevron-down"
                                w="100%"
                                as={Button}
                                variantColor="dark"
                            >
                                {isOpen
                                    ? "Welcome Jhon Doe"
                                    : "Welcome Jhon Doe"}
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem onClick={() => alert("Kagebunshin")}>
                                    Power
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Flex>
            <Flex flex="3" flexDirection="column" align="center">
                <Flex w="100%" flexDirection="row" cursor="pointer">
                    <Link to="/">
                        <Button
                            color="gray.200"
                            leftIcon={MdDashboard}
                            variantColor="#56657F"
                        >
                            Dashboard
                        </Button>
                    </Link>
                </Flex>
                {/* <Flex
                    w="100%"
                    flexDirection="row"
                    cursor="pointer"
                >
                    <Icon as={MdQuestionAnswer} mr="5" />
                    <Text>Preset Questions</Text>
                </Flex> */}
                <Flex w="100%" flexDirection="row" cursor="pointer">
                    <Link to="/questions">
                        <Button
                            color="gray.200"
                            leftIcon={MdList}
                            variantColor="#56657F"
                        >
                            Question Lists
                        </Button>
                    </Link>
                </Flex>
                <Flex w="100%" flexDirection="row" cursor="pointer">
                    <Link to="/add-question">
                        <Button
                            color="gray.200"
                            leftIcon={MdAddBox}
                            variantColor="#56657F"
                        >
                            Add Question
                        </Button>
                    </Link>
                </Flex>
                {/* <Flex
                    w="100%"
                    flexDirection="row"
                    cursor="pointer"
                >
                    <Icon as={MdSchedule} mr="5" />
                    <Text>Upcoming Schedule</Text>
                </Flex> */}
                <Flex w="100%" flexDirection="row" cursor="pointer">
                    <Link to="/rooms-list">
                        <Button
                            color="gray.200"
                            leftIcon={MdSettings}
                            variantColor="#56657F"
                        >
                            Rooms Management
                        </Button>
                    </Link>
                </Flex>
                <Flex w="100%" flexDirection="row" cursor="pointer">
                    <Link to="/room">
                        <Button
                            color="gray.200"
                            leftIcon={MdSettings}
                            variantColor="#56657F"
                        >
                            Room For Test
                        </Button>
                    </Link>
                </Flex>
                <Flex w="100%" flexDirection="row" cursor="pointer">
                    <Link to="/add-room">
                        <Button
                            color="gray.200"
                            leftIcon={MdAddBox}
                            variantColor="#56657F"
                        >
                            Add Room
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </>
    )
}
