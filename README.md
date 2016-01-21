jQuery Input filters (multiple) plugin

В CSS 2.1 отсутствуют псевдо-классы :focus, :checked, :read-only, :disabled, которые есть в CSS3.
Браузеры IE до 9 версии не поддерживают эти псевдоклассы.
JS код ниже по событиям браузера для элементов ввода добавляет/удаляет соответствующие обычные классы
в текущий и родительский элемент. Появляется возможность достичь лучшего интерактивного дизайна страниц
(включая старые браузеры), написав CSS правила, использующие эти классы.
Можно делать зависимость родительского элемента от текущего.
|HTML attribute 		|CSS3	pseudo class		|Replacement class in	current element	|Replacement class in	parent element	|Replacement parent element example|
-------------------------------------------------------------------------------------
-			:hover			.hover			has-*-hover			has-radio-hover
-			:focus			.focus			has-*-focus			has-email-focus
checked		:checked		.checked		has-*-checked		has-checkbox-checked
selected		-				.selected		has-*-selected		has-option-selected
readonly		:read-only		.read-only		has-*-read-only		has-text-readonly
disabled		:disabled		.disabled		has-*-disabled		has-submit-disabled
-			:enabled		.enabled		has-*-enabled		has-select-enabled
* -- это тип тега (атрибут type) или название самого тега, если типа нет.

