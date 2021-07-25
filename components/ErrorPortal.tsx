import React, { useState } from 'react';

import {
	TextInput,
	Text,
	Button,
	Portal,
	Dialog,
	Paragraph,
} from 'react-native-paper';

interface Props {
	errorText: string;
	hideDialog: () => void;
	visible: boolean;
}

const ErrorPortal = ({ errorText, hideDialog, visible }: Props) => {
	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Content>
					<Text>{errorText}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button focusable onPress={hideDialog}>
						Ok
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default ErrorPortal;
