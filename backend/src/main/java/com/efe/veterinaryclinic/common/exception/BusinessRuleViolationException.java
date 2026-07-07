package com.efe.veterinaryclinic.common.exception;

public class BusinessRuleViolationException extends RuntimeException {

    private final String field;

    public BusinessRuleViolationException(String field, String message) {
        super(message);
        this.field = field;
    }

    public String getField() {
        return field;
    }
}
