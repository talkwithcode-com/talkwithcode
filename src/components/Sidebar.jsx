import React from "react"
import {
    Avatar,
    Button,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/core"
import {
    MdDashboard,
    MdQuestionAnswer,
    MdList,
    MdSchedule,
    MdSettings,
} from "react-icons/md"

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
                                {isOpen ? "Jhon Doe" : "Jhon Doe"}
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
            <Flex flex="3" flexDirection="column">
                <Flex
                    w="100%"
                    p={4}
                    color="white"
                    flexDirection="row"
                    cursor="pointer"
                >
                    <Icon as={MdDashboard} mr="5" />
                    <Text>Dashboard</Text>
                </Flex>
                <Flex
                    w="100%"
                    p={4}
                    color="white"
                    flexDirection="row"
                    cursor="pointer"
                >
                    <Icon as={MdQuestionAnswer} mr="5" />
                    <Text>Preset Questions</Text>
                </Flex>
                <Flex
                    w="100%"
                    p={4}
                    color="white"
                    flexDirection="row"
                    cursor="pointer"
                >
                    <Icon as={MdList} mr="5" />
                    <Text>Question List</Text>
                </Flex>
                <Flex
                    w="100%"
                    p={4}
                    color="white"
                    flexDirection="row"
                    cursor="pointer"
                >
                    <Icon as={MdSchedule} mr="5" />
                    <Text>Upcoming Schedule</Text>
                </Flex>
                <Flex
                    w="100%"
                    p={4}
                    color="white"
                    flexDirection="row"
                    cursor="pointer"
                >
                    <Icon as={MdSettings} mr="5" />
                    <Text>Schedule Management</Text>
                </Flex>
            </Flex>
        </>
    )
}
